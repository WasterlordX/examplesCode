##Компонент иконка!

###вызов компонента:
```vue
<Button
  v-for="(el, i) in variableButton"
  :type="el"
  :big="big"
  :disabled="disabled"
  :key="i"
  :label="label"
  link="http://localhost:8080/form/formElements"
>
  <svg-icon v-if="icons" :name="selectIcons" size="20" />
</Button>
```
###Props:
    big   ( default false )   - размер кнопки 
    type  ( default primary ) - тип кнопки
    label ( default button )  - текст в кнопке
    link  - ссылка ( если параметр передаеться и тип secondary2, то кнопка становится ссылкой ) 
###Slot
    slot - в даном случае прринимает иконку
        
    