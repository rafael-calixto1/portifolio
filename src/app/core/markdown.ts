import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

/** Renders markdown to HTML. Bind with [innerHTML] so Angular sanitizes the output. */
@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  transform(value: string | undefined | null, inline = false): string {
    if (!value) return '';
    return inline ? (marked.parseInline(value) as string) : (marked.parse(value) as string);
  }
}
