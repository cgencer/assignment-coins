let closureMessage = '';
function subSet(coins, total) {
	const pairs = Object.entries(coins),
		results = [],
		 getSum = multiplications => 
			multiplications.reduce((sum, multiplicator, position) => 
				sum + pairs[position][1] * multiplicator, 0),

   formatResult = result => result.map(multiplications => 
		multiplications.reduce((res, multiplicator, position) => 
			(multiplicator > 0 ? 
				res.push(`${multiplicator} x ${pairs[position][0]} (of each ${pairs[position][1]} cents, subtotal is ${pairs[position][1]*multiplicator})`) : 
				res, res), [])
			);

	function findSums(multiplications, position) {
		let s;
		while((s = getSum(multiplications)) <= total) {
			if (s >= total) {
				results.push([...multiplications]);
			}
			if (position < pairs.length - 1) {
				const m = [...multiplications],
		   nextPosition = position + 1;
				m[nextPosition]++;
				findSums(m, nextPosition);
			}
			multiplications[position]++;
		}
	}
	findSums(pairs.map(_ => 0), 0);
	closureMessage = `\n\nThere are ${results.length} different sets of coins all with a sum of 1$.`;
	return results.length > 0 ? formatResult(results) : "Not found";
}

console.dir(subSet({
	quarters: 25, 
	dimes: 10,
	nickels: 5, 
	pennies: 1
}, 100));
console.log(closureMessage);
