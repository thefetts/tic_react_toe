module.exports = {
	entry: './index.jsx',
	output: {
		filename: 'bundle.js',
		publicPath: 'http://localhost:8090/assets'
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loaders: ['react-hot', 'jsx', 'babel'],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			}
		]
	},
	externals: {
		'react': 'React'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};
