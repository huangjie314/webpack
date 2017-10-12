/*
* old code
*/
/*const greeter = require('./Greeter.js');
document.querySelector('#root').appendChild(greeter());*/

/*---------------------------------------------*/

/*
* update code use React.js And ES6
*/
import React from 'react'
import {render} from 'react-dom'
import Greeter from './Greeter.js'

import './main.css' //使用require导入css文件

render(
    <Greeter />,
    document.getElementById('root')
);