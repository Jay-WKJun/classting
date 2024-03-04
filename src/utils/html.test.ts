import { decodeHtmlString } from './html';

describe('decodeHtmlString function', () => {
  test('decodes HTML entities with special characters', () => {
    const htmlString =
      '&lt;p&gt;This is a p tag with &quot;quotes&quot;&lt;/p&gt;';
    const decodedString = decodeHtmlString(htmlString);

    expect(decodedString).toEqual('<p>This is a p tag with "quotes"</p>');
  });

  test('returns an empty string if input is empty', () => {
    const emptyString = '';
    const decodedString = decodeHtmlString(emptyString);

    expect(decodedString).toEqual('');
  });

  test('decodes every HTML special characters', () => {
    const htmlString =
      '&lt;tag&gt; &quot;quotes&quot; &amp;amp&amp; &apos;apos&apos; &lt;/tag&gt;';
    const decodedString = decodeHtmlString(htmlString);

    expect(decodedString).toEqual(`<tag> "quotes" &amp& 'apos' </tag>`);
  });
});
