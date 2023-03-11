function LoadFont(font) {
  const map = new Map();
  
  for (let i = 0; i < font.length; i++) {
    let chars = font[i].shift();
    for (let j = 0; j < chars.length; j++)
      map.set(chars[j], font[i]);
  }
  
  return map;
}

function CarriageReturn(cursor, height, spacing) {
  cursor[0] = 0;
  cursor[1] += height + spacing[1];
}

function RendChar(char, pixy, color, font, spacing, cursor = [0, 0]) {
  let rendChar = font.get(char);
  if (rendChar == undefined)
    rendChar = '?';
  if (char == '\n') {
    CarriageReturn(cursor, font.get(' ').length, spacing);
    return;
  }
  for (let i = 0; i < rendChar.length; i++)
    for (let j = 0; j < rendChar[0].length; j++)
      if (rendChar[i][j])
        pixy.setPixel([cursor[0] + j, cursor[1] + i], color);
  cursor[0] += rendChar[0].length + spacing[0];
  if (cursor[0] + rendChar[0].length >= pixy.res[0])
    CarriageReturn(cursor, rendChar.length, spacing);
}

function RenderText(pixy, text, color, font, spacing, cursor = [0, 0], length = undefined) {
  if (length == undefined)
    length = text.length;
  for (let i = 0; i < length; i++)
    RendChar(text[i], pixy, color, font, spacing, cursor);
}

function RenderTextLinkedList(pixy, text, color, font, spacing, cursor = [0, 0], length = undefined) {
  if (length == undefined)
    length = text.length;
  for (let i = text.head; i != undefined; i = i.next) {
    RendChar(i.data, pixy, color, font, spacing, cursor);
    length--;
    if (length < 1)
      break;
  }
}
