# ionic2-external-link-directive

A directive to mark a link as an external link and open using the InAppBrowser plugin (will fallback to open in a new tab on browsers).

*This directive requires Ionic Native and the InAppBrowser plugin.*


### How to install
Using Ionic CLI, run `ionic g directive ExternalLink` on your terminal. Make sure you are on your project's folder.

After it finished generating, add the directive on your app's @NgModule inside `src/app/app.module.ts`. It should look like this:
```javascript
import ... //your other imports
import { ExternalLink } from '../components/external-link/external-link';
 
@NgModule({
  declarations: [
    ..., //your other declarations
    ElasticHeader
  ],
  ... //others
})
export class AppModule {}
```

Open `src/components/external-link/external-link.ts` and modify the code to:
```javascript
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

```

------

### How to use
Just add the [external-link] attribute to your `<a>` tag.
```html
<a href="http://www.google.com" external-link>External link</a>
```


Thats it!
