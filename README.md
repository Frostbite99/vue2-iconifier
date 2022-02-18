# vue2-iconifier

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



Vue2 component in form of a dialog for selecting icons among Google's Material Icons pack. Icon searches supports both English and Turkish (Courtesy of Google Translate) names of icons.

Installation:

```
npm install vue2-iconifier --save
```

Usage:

Most basic usage of the component would be with no props. This will result in in a blue plus button appear on the screen, and one may explore the icons via this mode:

```
<iconifier></iconifier>
```

To actually receive the result from the iconifier, one should define a function to catch the changes in iconifier component by watching the selectIcon function:

```
<iconifier @selectIcon="catchSelected" ></iconifier>
```

Where catchSelected is defined as:

```
catchSelected(selectedIcon){

    this.selection = selectedIcon // selection is a variable defined in parent component.

}
```

If user wants to remove the default button and implement custom logic for opening up the dialog, then following configuration should be made:
``` vue
<iconifier @selectIcon="catchSelected" :toggle="toggleDialog" @toggle="catchToggle"  />
```

In this configuration, toggleDialog is a variable defined by user to control dialog action. If dialog is closed by its buttons, then the parent component also has to be notified. Therefore, user should define a function to handle these cases and assign it to@toggle tag. An example is below:
``` js
catchToggle(event){

    this.toggleDialog = event // toggleDialog is a variable defined in parent component.

}
```






