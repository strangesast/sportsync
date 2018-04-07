import { BoardTemplateElement } from './board-template-element.model';

export interface BoardTemplate {
  id?: string;
  name: string;
  size: { width: number, height: number };
  elements?: BoardTemplateElement[];
}
