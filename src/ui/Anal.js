const ga = window.ga




function Anal(str) {
	// console.log(str);
	ga('send', 'event', 'handwrite', str);
}

export default Anal