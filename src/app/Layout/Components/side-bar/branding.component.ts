import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="./assets/images/logos/UIR logo.webp"
          class="align-middle m-2"
          alt="logo"
          width="200px"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
