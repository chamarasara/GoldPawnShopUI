import React from "react";
import { connect } from 'react-redux';
import ReactToPrint from "react-to-print";
import Reports from "./Reports";

class PrintReports extends React.Component {

    printOrder = () => {
        const printableElements = document.getElementById('printme').innerHTML;
        const orderHtml = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
        const oldPage = document.body.innerHTML;
        console.log(oldPage)
        document.body.innerHTML = orderHtml;
        window.print();
        document.body.innerHTML = oldPage
    }
    checkPrint = () => {
        if (!this.printOrder) {
            return true;
        } else if (this.printOrder) {
            window.alert("Insert start date and end date")
        }
    }
    render() {
        return (
            <div className="ui containe">
                <div>
                    <Reports printableId='printme' />
                </div>
                <div>
                    <button onClick={() => this.checkPrint()}>
                        Print Report
                </button>
                </div>
            </div>

        );
    }
}
export default connect()(PrintReports);