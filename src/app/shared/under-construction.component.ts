import { Component } from '@angular/core';

@Component({
  selector: 'app-under-contstruction',
  template: `
    <section style="display: flex; justify-content: center; align-items: center; min-height: 40rem; flex-direction: column;">
      <img src="../../../assets/images/under-construction.svg" alt="modification" style="width: 128px;" class="u-margin-bottom">
      <p class="u-text-normal">Jeszcze niegotowe</p>
    </section>
  `,
})
export class UnderConstructionComponent {
}
