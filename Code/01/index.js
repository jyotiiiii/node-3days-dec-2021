const arguments = process.argv
let flags = []
let args = []

arguments.forEach(arg => {
	if(/^--/.test(arg)) {
		flags.push(arg)
	} else if (!arg.includes("/Users")) {
		args.push(arg)
	}
})

if(flags.includes("--add")) {
console.log(args.reduce((a,c) => a+ parseInt(c), 0))
} else {
  console.log(args.reduce((a,c) => a* parseInt(c), 1))
}


