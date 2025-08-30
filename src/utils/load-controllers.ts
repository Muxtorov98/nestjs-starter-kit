import fg from 'fast-glob';
import { join } from 'path';

export function loadControllers(): any[] {
  const files = fg.sync(join(__dirname, 'controllers', '*.controller.{ts,js}'));
  return files.map((file) => {
    // dynamic import
    const module = require(file);
    // faylda bitta controller export qilingan deb hisoblaymiz
    return Object.values(module)[0];
  });
}
