import React from 'react';
import './Main.css';

export default class Main extends React.Component {

    constructor(){
        super()
        this.state = {
            bill: '',
            people: '',
            service: '',
            result: '',
            each: false
        }
    }

    incPeople = (e) => {
        e.preventDefault();
        let peopleCount = parseInt(this.state.people);
        peopleCount = isNaN(peopleCount) ? 0 : peopleCount;
        this.setState({ people:  peopleCount + 1});
    }
    decPeople = (e) => {
        e.preventDefault();
        let peopleCount = parseInt(this.state.people);
        if(peopleCount != NaN && peopleCount > 1){
            peopleCount = isNaN(peopleCount) ? 0 : peopleCount;
            this.setState({ people:  peopleCount - 1});
        }
    }

    formHandler = (e) => {
        e.preventDefault();
        if(this.state.bill === "" || this.state.bill === undefined){
            alert('Please Enter Bill Amount');
        }else{
            let billAmount = parseFloat(this.state.bill);
            let peopleCount = parseInt(this.state.people);
            peopleCount = isNaN(peopleCount) || peopleCount <= 1 ? 1 : peopleCount;
            if(peopleCount > 1){
                this.setState({ each: true });
            }else{
                this.setState({ each: false });
            }
            let service = parseFloat(this.state.service);
            service = isNaN(service) ? 1 : service;
            let totalBill = (billAmount * service) / peopleCount;
            totalBill = (Math.round(totalBill * 100) / 100).toFixed(2);
            // console.log(totalBill, this.state.each);
            this.setState({
                result: `Tip Amount \n $${totalBill}`
            })
        }
    }

    render(){
        return(
            <main>
                <div className="calc">
                    <div className="head">
                        <h2>Tip calculator</h2>
                    </div>
                    <div className="tool">
                        <form onSubmit={this.formHandler}>
                            <div className="field">
                                <label htmlFor="billamt">How much was your bill?</label>
                                <input 
                                    type="text" 
                                    name="billamt" 
                                    className="bill"
                                    id="billamt" 
                                    placeholder="$ Bill Amount"
                                    value={this.state.bill}
                                    onChange={
                                        (e) => {
                                            this.setState({ bill: e.target.value })
                                        }
                                    }
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="peopleamt">How many people sharing this bill?</label>
                                <div className="under_field">
                                    <button onClick={this.decPeople}> - </button>
                                    <input 
                                        type="text" 
                                        name="peopleamt" 
                                        id="peopleamt" 
                                        value={this.state.people} 
                                        placeholder="Number Of People" 
                                        onChange={
                                            (e) => {
                                                this.setState({ people: Math.abs(e.target.value) })
                                            } 
                                        }
                                    />
                                    <button onClick={this.incPeople}> + </button>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="serviceQual">How was your service?</label>
                                <select name="serviceQual" id="serviceQual" 
                                    value={this.state.service}
                                    onChange={
                                        (e) => {
                                            this.setState({ service: e.target.value });
                                    }
                                }>
                                    <option value="none"> -- Choose an Option -- </option>
                                    <option value="0.3">30% - Outstanding</option>
                                    <option value="0.25">25% - Great</option>
                                    <option value="0.2">20% - Good</option>
                                    <option value="0.15">15% - It was OK</option>
                                    <option value="0.1">10% - Bad</option>
                                    <option value="0.05">5% - Terrible</option>
                                </select>
                            </div>
                            <div className="buttons">
                                <button id="calculate" type="submit">Calculate</button>
                            </div>
                        </form>
                    </div>
                    <div className="result">
                        <h3>{this.state.result} <small>{this.state.each ? 'each' : null}</small></h3>
                    </div>
                </div>
            </main>
        );
    }
}