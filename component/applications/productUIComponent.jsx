import React, { Component } from "react";
import ProductService from "./../services/service.js";
class ProductUIComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductId: 0,
      ProductName: "",
      Price: 0,
      CategoryName: "",
      Manufacturer: "",
      sortFlag:true,
      reverseFlag:true,
      Products: [
        {
          ProductId: 101,
          ProductName: "laptop",
          Price: 29999,
          CategoryName: "Electronics",
          Manufacturer: "IBM"
        },
        {
          ProductId: 102,
          ProductName: "fan",
          Price: 2999,
          CategoryName: "Electrical",
          Manufacturer: "Usha"
        }
      ],
      Categories: ["Electronics", "Electrical", "Food"],
      Manufacturers: ["USHA", "IBM", "NESTLE"],
      SortBy : [
          "ProductId",
          "ProductName",
          "Price",
          "CategoryName",
          "Manufacturer"
      ]

    };

    this.serv = new ProductService();
  }

  // e is an event payload raised on the target element and we can read the payload data by using e
  onChangeProduct(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onclickClear(e) {
    this.setState({ ProductId: 0 });
    this.setState({ ProductName: "" });
    this.setState({ Price: 0 });
    this.setState({ CategoryName: "" });
    this.setState({ Manufacturer: "" });
  }

  onclickSave(e) {
    /*lert(` ${this.state.ProductId} ${this.state.ProductName} ${this.state.CategoryName}
                ${this.state.Price} ${this.state.Manufacturer} 
        `);

        /*let tempArray=this.state.Products.slice();
        tempArray.push({ProductId:this.state.ProductId,ProductName:this.state.ProductName,Price:this.state.Price,
            CategoryName:this.state.CategoryName,Manufacturer:this.state.Manufacturer});*/

    let prd = {
      ProductId: this.state.ProductId,
      ProductName: this.state.ProductName,
      Price: this.state.Price,
      CategoryName: this.state.CategoryName,
      Manufacturer: this.state.Manufacturer
    };
    this.serv
      .postData(prd)
      .then(res => res.json())
      .then(resp => resp.data)
      .catch(error => console.log(error.status));
  }

  onClickDelete(e) {
    let id = e.ProductId;
console.log(id);

    this.serv
      .deleteData(id)
      .then(res => res.json())
      .then(resp => {
        console.log(JSON.stringify(resp.data));
      })
      .catch(err => console.log(err.status));
  }

  onClickUpdate(e){
      let prd={ ProductId:this.state.ProductId,
        ProductName: this.state.ProductName,
        Price: this.state.Price,
        CategoryName: this.state.CategoryName,
        Manufacturer: this.state.Manufacturer}
    //   let id={ ProductId: e.ProductId}  
      console.log()
    this.serv
      .UpdateData(prd)
      .then(res => res.json())
      .then(resp => resp.data)
      .catch(error => console.log(error.status));

  }

  sortByType(e) {
    let type = e.target.value;
    let temp = this.state.Products;

    temp.sort(function(a,b)  {
      if(typeof a[type] == 'string' && a[type] != undefined){
         return a[type].toLowerCase().localeCompare(b[type].toLowerCase());
      }
      else{
        return a[type] - b[type];
      }
    })
    this.setState({ Products: temp });
  }
  onReverse(e){
    let temp = this.state.Products;
    temp.reverse();
    this.setState({ Products: temp });
  }

  getSelectedProduct(e) {
    /*alert(` ${this.state.ProductId} ${this.state.ProductName} ${this.state.CategoryName}
        ${this.state.Price} ${this.state.Manufacturer}`);*/
    this.setState({ ProductId: e.ProductId });
    this.setState({ ProductName: e.ProductName });
    this.setState({ Price: e.Price });
    this.setState({ CategoryName: e.CategoryName });
    this.setState({ Manufacturer: e.Manufacturer });
  }
  //method will e executed immediately after the render() completes its job

  componentDidMount() {
    let prds = this.serv
      .getData()
      .then(data => data.json())
      .then(value => {
        this.setState({
          Products: value.data
        });
        // console.log(JSON.stringify(value.data));
      })
      .catch(error => {
        console.log(`Error Occured ${error.status}`);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="form-group">
          <label htmlFor="ProductId">ProductId</label>
          <input
            type="text"
            className="form-control"
            value={this.state.ProductId}
            onChange={this.onChangeProduct.bind(this)}
            name="ProductId"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProductName">ProductName</label>
          <input
            type="text"
            className="form-control"
            value={this.state.ProductName}
            onChange={this.onChangeProduct.bind(this)}
            name="ProductName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Price">Price </label>
          <input
            type="text"
            className="form-control"
            name="Price"
            value={this.state.Price}
            onChange={this.onChangeProduct.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="CategoryName">CategoryName</label>
          <select
            className="form-control"
            name="CategoryName"
            value={this.state.CategoryName}
            onChange={this.onChangeProduct.bind(this)}
          >
            {this.state.Categories.map((c, i) => (
              <Options key={i} data={c} />
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Manufacturer">Manufacturer</label>
          <select
            className="form-control"
            name="Manufacturer"
            value={this.state.Manufacturer}
            onChange={this.onChangeProduct.bind(this)}
          >
            {this.state.Manufacturers.map((c, i) => (
              <Options key={i} data={c} />
            ))}
          </select>
        </div>
        <div className="form-group">
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="button"
                    value="New"
                    className="btn btn-default"
                    onClick={this.onclickClear.bind(this)}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Save"
                    className="btn btn-success"
                    onClick={this.onclickSave.bind(this)}
                  />
                </td>
 
                <td>
                  <input
                    type="button"
                    value="Update"
                    className="btn btn-warning"
                    onClick={this.onClickUpdate.bind(this)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container">
          <div className="form-group">
            <label htmlFor="SortBy">Sort By</label>
            <select
              type="text"
              className="form-control"
              name="sortBy"
              value={this.state.sortBy}
              onClick={this.sortByType.bind(this)}
            >
              {this.state.SortBy.map((c, i) => (
                <Options key={i} data={c} />
              ))}
            </select>
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="option"
                id="sort"
                value="sort"
                onClick={this.sortByType.bind(this)}
              />
              <label className="form-check-label" htmlFor="sort">
                Sort
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="option"
                id="reverse"
                value="reverse"
                onClick={this.onReverse.bind(this)}
              />
              <label className="form-check-label" htmlFor="reverse">
                Reverse
              </label>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ProductID</th>
                <th>ProductName</th>
                <th>Price</th>
                <th>CategoryName</th>
                <th>Manufacturer</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Products.map((prd, idx) => (
                <TableRow
                  key={idx}
                  row={prd}
                  selected={this.getSelectedProduct.bind(this)}
                  deleted={this.onClickDelete.bind(this)}
                  //updated={this.onClickUpdate.bind(this)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
//Component that will render <option>/<option>
//Props.data is the data passed from the parent of this component
class Options extends Component {
  render() {
    return <option value={this.props.data}>{this.props.data}</option>;
  }
}

class TableRow extends Component {
  constructor(props) {
    super(props);
  }

  onRowClick() {
    this.props.selected(this.props.row);
  }

  onRowDelete() {
    // a "selected" method is used to pass received data
    this.props.deleted(this.props.row);
  }

  onRowUpdate(){
      this.props.updated(this.props.row)
  }

  render() {
    return (
      <tr onClick={this.onRowClick.bind(this)}>
        <td> {this.props.row.ProductId}</td>
        <td>{this.props.row.ProductName}</td>
        <td>{this.props.row.Price}</td>
        <td>{this.props.row.CategoryName}</td>
        <td>{this.props.row.Manufacturer}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onRowDelete.bind(this)}>
            Delete
          </button>
        </td>
        >
      </tr>
    );
  }
}
export default ProductUIComponent;
