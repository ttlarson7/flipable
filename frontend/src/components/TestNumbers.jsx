
function TestNumbers({ scrollTo, index }) {
    
    //handling the scrolling
    const handleClick = () => {
        const element = document.getElementById(`${scrollTo}`);
        console.log(element)
        if (element) {
            const elementRect = element.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.pageYOffset;
            const middleOfElement = absoluteElementTop - (window.innerHeight / 2);
            window.scrollTo({ top: middleOfElement, behavior: 'smooth' });
        }
    }

    //To scroll to the different elements
    return (
        <div className="m-2" style={{width: "100px"}}>
            <button className="btn btn-outline btn-secondary w-full" onClick={handleClick}>{index}</button>
        </div>
    )
}

export default TestNumbers;