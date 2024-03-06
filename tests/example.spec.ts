import { test, expect, Page } from '@playwright/test';

// quiz API에서 짧은 시간에 여러번의 요청을 거부하기 때문에 fetch를 최소화 하는 방향으로 테스트를 만들었습니다.

test('test home page', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page).toHaveTitle(/ClassTing Quiz!/);
  await expect(await page.getByText('ClassTing Quiz!')).toBeVisible();
  await expect(
    await page.getByRole('link', { name: '퀴즈 풀기' }),
  ).toBeVisible();
  await expect(
    await page.getByRole('link', { name: '기록 보기' }),
  ).toBeVisible();
});

test('test quiz flow', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: '퀴즈 풀기' }).click();

  await expect(page).toHaveURL('http://localhost:3000/quiz/start');
  await page.waitForURL('http://localhost:3000/quiz/0', { timeout: 100000 });
  await expect(page).toHaveURL('http://localhost:3000/quiz/0');

  await page.getByRole('button', { name: /./ }).first().click();
  const nextLinkButton = await page.getByRole('link', { name: '다음 문항' });
  await expect(nextLinkButton).toBeVisible();
  await nextLinkButton.click();

  let count = 1;
  while (count < 20) {
    await page.getByRole('button', { name: /./ }).first().click();
    const nextLinkButton = await page
      .getByRole('link', {
        name: /[다음 문항]|[결과 보기]/,
      })
      .first();
    const isDone = (await nextLinkButton.textContent()) === '결과 보기';
    await nextLinkButton.click();
    if (isDone) break;
    await page.waitForURL(`http://localhost:3000/quiz/${count}`);
    count += 1;
  }

  await page.waitForURL('http://localhost:3000/result', { timeout: 100000 });
  await expect(page).toHaveURL('http://localhost:3000/result');
  await expect(page.getByText('결과')).toBeVisible();
  await expect(page.getByText('오답 노트')).toBeVisible();
  await expect(
    await page.getByRole('link', { name: '다시 도전하기!' }),
  ).toBeVisible();
  await expect(await page.getByRole('link', { name: '홈으로!' })).toBeVisible();
  await expect(
    await page.getByRole('link', { name: '기록보기' }),
  ).toBeVisible();
});

test('show alert and return to home when note is not exist', async ({
  page,
}) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: '기록 보기' }).click();

  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('오답노트가 없습니다.');
    await dialog.accept();

    await page.waitForURL('http://localhost:3000/');
    await expect(page.url()).toBe('http://localhost:3000/');
  });

  await page.waitForURL('http://localhost:3000/note/0');
  await expect(await page.url()).toBe('http://localhost:3000/note/0');
});

test('test note page & redirect logic', async ({ page }) => {
  await initAndGoToNotePage(page);

  await page.waitForURL('http://localhost:3000/note/1');
  const homeLinkButton = await page.getByRole('link', { name: '🏠' });
  await expect(homeLinkButton).toBeVisible();
  await expect(homeLinkButton).toHaveAttribute('href', '/');

  const prevLinkButton = await page.getByRole('link', { name: '<' });
  await expect(prevLinkButton).not.toBeVisible();

  const nextLinkButton = await page.getByRole('link', { name: '>' });
  await expect(nextLinkButton).not.toBeVisible();

  const deleteButton = await page.getByRole('button', { name: '❌' });
  await expect(deleteButton).toBeVisible();

  await expect(await page.getByText('오답노트')).toBeVisible();
  await expect(await page.getByText('소요시간')).toBeVisible();

  // 없는 note를 찾아가면 note번호와 가장 가까운 note로 자동으로 redirect된다.
  await page.goto('http://localhost:3000/note/1000');
  await expect(await page.url()).toBe('http://localhost:3000/note/1');
});

async function initAndGoToNotePage(page: Page) {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: '퀴즈 풀기' }).click();

  await page.waitForURL('http://localhost:3000/quiz/0', { timeout: 100000 });
  let count = 1;
  while (count < 20) {
    await page.getByRole('button', { name: /./ }).first().click();
    const nextLinkButton = await page
      .getByRole('link', {
        name: /[다음 문항]|[결과 보기]/,
      })
      .first();
    const isDone = (await nextLinkButton.textContent()) === '결과 보기';
    await nextLinkButton.click();
    if (isDone) break;
    await page.waitForURL(`http://localhost:3000/quiz/${count}`);
    count += 1;
  }
  await page.waitForURL('http://localhost:3000/result', { timeout: 100000 });
  await page.getByRole('link', { name: '기록보기' }).click();
}
