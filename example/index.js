require('./index.less');
var React = require('react');
var ReactDOM = require('react-dom');
var {china,Map} = require('../lib/index');

ReactDOM.render(<Map data={china} width={480} height={560} />,document.getElementById("react-container"));