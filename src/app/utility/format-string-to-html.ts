export function formatStringToHtml(str: string) {
  return str.replace(/\*\*([^*]+?)\*\*/g, '<b>$1<\/b>')
    .replace(/\n/g, '<br>')
    .replace(/```([^*]+?)```/g, '<div class="code">```$1```<\/div>');
}
