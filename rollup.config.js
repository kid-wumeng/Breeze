import uglify   from 'rollup-plugin-uglify';
import coffee2  from 'rollup-plugin-coffee2';
import resolve  from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';



export default
{
   input: 'src/index.coffee',

   output: {
      file:   'dist/breeze.js',
      format: 'iife',
      name:   'Breeze'
   },

   plugins: [
      uglify(),
      coffee2(),
      resolve(),
      commonjs({
         extensions: ['.js', '.coffee', '.css']
      })
   ]
}