import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu-component',
  standalone: true,
  imports: [
    RouterModule
  ],
  template: `
  <a
      [routerLink]="path"
      routerLinkActive="bg-lime-800"
      class="flex justify-center items-center hover:bg-lime-800 rounded-md p-2 transition-colors"
    >
      <i class="{{ icon }} text-2xl mr-4 text-lime-400"></i>
      <div class="flex flex-col flex-grow">
        <span class="text-white text-lg font-semibold">{{ title }}</span>
        <span class="text-gray-200 text-sm">{{ desc }}</span>
      </div>

    </a>
  
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuComponentComponent { 

  @Input({required:true}) icon!:string;
  @Input({required:true}) title!:string;
  @Input({required:true}) desc!:string;
  @Input({required:true}) path!:string;

}