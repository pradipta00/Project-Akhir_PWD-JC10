const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: { 
			'@primary-color': '#06C260', 
			'@avatar-bg' : '#00bfff', 
			'@layout-header-background' : '#111',
			'@layout-footer-background' : '#111'
		},
	}),
);