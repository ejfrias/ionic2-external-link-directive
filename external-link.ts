import { Directive, ElementRef } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Directive({
	selector: '[external-link]' // Attribute selector
})
export class ExternalLink {

	constructor( private element: ElementRef, private iab: InAppBrowser ){
		//add click/tap listener
		['click', 'tap'].forEach(e => {
			this.element.nativeElement.addEventListener(e, (event) => {
				event.preventDefault();

				let target = event.target;
				let link = target.href;

				//do a validation if the clicked element has a valid link
				if( ! link ){
					//most probably that a child element has been clicked, find the parent element with a valid href
					let i = 1; //stop looking after 20 jumps which a high chance that it wont reach
					while( ! link && i < 20 ){
						target = target.parentNode;
						link = target.href;
						i++;
					}
				}
				
				if( link ){
					this.iab.create( link ); //opens the link with InAppBrowser if available, will fall back to window.open if not
				}
			});
		});
	}

}
