import { Directive, input } from '@angular/core';

interface TableRowTemplateContext<Titem extends object> {
  $implicit: Titem;
}

@Directive({
  selector: 'ng-template[appTableRow]',
})
export class TableRowDirective<Titem extends object> {
  appTableRow = input.required<Titem[]>();

  constructor() {}

  static ngTemplateContextGuard<Titem extends object>(
    dir: TableRowDirective<Titem>,
    ctx: unknown,
  ): ctx is TableRowTemplateContext<Titem> {
    return true;
  }
}
