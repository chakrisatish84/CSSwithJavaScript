# Install type script
npm install typescript - It will create package.json file

# Initialize type script config file
tsc --init (it will generatate ts.config file)

# Update outDir to place compiled java script files.
update outDir like "./js” (to save js files in one location)

# Watch all local changes
tsc - w (it will watch your local changes)

# Got an error while using flatMap and fixed that with this update.
 "lib": ["dom","esnext"], 

 # Got this error while compiling, uncaught referenceerror exports is not defined
 # to fix this, commented this line.
 // "module": "commonjs", 