import "./DietPage.css"
export default function DietPage(){
    const week = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const showWeeks = (day) => {
        return(
        <div className="col-1 p-1 m-1 settings-block text-center">
        <h3>{day}</h3>
    </div>);
    }
    return (
        <div>
            <h1 className="container">Diet Plan</h1>
            <div className="">
                <div className="row">
                    
                    <div className="col-2">
                    </div>
                    {week.map((day)=> showWeeks(day))}
                </div>
            </div>
        </div>
    );
}