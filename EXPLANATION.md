# Explanation

OK, so now that I've wowed you with my code, let's talk about what's going on. Because this project is made for data management, so I use CRA (Create React App) to boost the web app supports. For static typing I use Typescript template when setup this boilerplate. 

## Folder Structure
First of all is folder structure. I use [Next Right Now](https://unlyed.github.io/next-right-now/reference/folder-structure) boilerplate folder structure.

![folder structure](https://media.discordapp.net/attachments/825942988072288328/984800460647055401/unknown.png)

Overview of what each folder under `src` is about:
* common: Contains everything that cannot be categorized as a module. The common folder is meant to be a simple and quick way for developers to write code, without having to think about to modularize it.
* layouts: Contains the layouts used by pages. A layout is composed of elements (Components, utils, etc.) that are used in several pages through your app. Layouts change the meta components that are used by several pages.
* modules: Contains related pieces of code (components, types, utils) grouped together. They are being separated from other modules by default, so you can locate your own code faster.
* pages: Contains pages 
* containers: Container to wrap the components related to a module 

## Styling CSS
![scss folder structure](https://cdn.discordapp.com/attachments/825942988072288328/984800929968709642/unknown.png)

For styling CSS I add SASS and use SCSS syntax to write the all I needs such as :
  1. Variables - written in advance map variable
  2. Mixin - the shortcut syntax to call multiple CSS attribute
  3. Function - the function to call variable in map get & reusable in helper
  4. Helper - a couple of className helper can be used by assign it right to the className of component
  5. Animation - keyframes declaration

## UI
This is UI view in desktop screen. All of components used is built from scratch.

![fish list desktop view](https://media.discordapp.net/attachments/825942988072288328/984797758525415466/unknown.png?width=778&height=584)


### Top Section
![top section](https://media.discordapp.net/attachments/825942988072288328/984813319674286140/unknown.png)
In this top section there is search box that can be type a keyword `Komoditas` to search. The typed keyword will be used as a query param to search data in `Stein` Google Sheets data. This component using debounce mechanism with 500 milliseconds delay for each changes, so the request will be called efficient only on idle.

### Middle Section
Middle section is a table to display the paginated data. When user is typing the keyword and the network request is still pending, the shimmer loader will be shown to tell user that is still in loading state.
![middle section](https://cdn.discordapp.com/attachments/825942988072288328/984814585511026708/unknown.png)

### Bottom Section
![bottom section](https://cdn.discordapp.com/attachments/825942988072288328/984815599505010708/unknown.png)

In this bottom section there is pagination to paginate a hundred of data from Google Sheet. Stein only provide `limit` and `offset` query params, so I have to inspect what is count of total data. After I got the count of total data, then this is applicable to create a pagination

### Adding Data Dialog
![bottom section](https://cdn.discordapp.com/attachments/825942988072288328/984816520389615687/unknown.png)

Stein allow us to add a data to the sheet. This dialog is created for that. There is some fields in pure text input, but one of them is an `Autocomplete Input` which is `Cari Kota`. When user start to typing a city, the suggestion will be appear. The source of cities is come from Google Sheet also, `option_area` list.

![bottom section](https://media.discordapp.net/attachments/825942988072288328/984817325284917258/unknown.png)


### SVG Icon Generator
All icons used in this project is generated from SVG path. This is the sample path of icon.
``` javascript
"three-dots": {
  path: "M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
  viewBox: "0 0 16 16",
  translate: "translate(0, 0)",
}
```
And then this is the component generator
```jsx
const IconComponent: FC<IconProps> = ({
  children,
  color = THEME_COLORS["blackSoft"],
  size = 14,
}) => {
  if (!ICONS[children]) return null

  const { path, translate, viewBox } = ICONS[children]
  const renderSvg = (): ReactNode => {
    return (
      <g
        id="icon"
        stroke="none"
        strokeWidth="1"
        fill={color}
        fillRule="evenodd"
      >
        <g transform={translate} fill={color}>
          <path fill={color} d={path} />
        </g>
      </g>
    )
  }

  return createElement("svg", {
    children: renderSvg(),
    height: `${size}px`,
    viewBox,
    width: `${size}px`,
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
  })
}
```

So thats all I do in this project! And there you have it, thank you.