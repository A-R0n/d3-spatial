import React, { Component } from 'react';
import './Form.css';
import * as d3 from 'd3';

export default class Form extends Component {
  constructor(){
    super();

    this.state = {
      value: 'small',
      selected: false,
      lowerBox: 0
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value});
  };

  handleSubmit = (event) => {
    console.log(event)
    const {lowerBox, value} = this.state;
    var space = 0;
    event.preventDefault();
    var lPoints = [];
    var newLine = d3.select('.containerMount').node();
    var l = newLine.getTotalLength();

    for (var j = 0; j < l; j++) {
        lPoints.push(newLine.getPointAtLength(j));
    }

    var length = lPoints.length;
    var p = newLine.getPointAtLength([ 0 ]);
    var q = lPoints[length - 1];
    var path = d3.path();
    d3.select('#space').remove().exit();

    if (value === 'small') {
      path.moveTo(p.x, p.y);
      path.lineTo(p.x, p.y - 3 / 4 * l - 25 + lowerBox);
      path.rect(p.x - 15, p.y - 3 / 4 * l - 40 + lowerBox, 30, 15);
      path.moveTo(p.x, p.y - 3 / 4 * l - 40 + lowerBox);
      path.lineTo(p.x, q.y);
      d3.select('.containerMount').attr('d', path).style('stroke', '#49fb35');
      d3.select('g').append('text').attr('id', 'space').text(`${space}` + '%').attr('x', p.x - 12).attr('y', p.y - 3 / 4 * l - 28 + lowerBox);
        this.setState({ lowerBox: lowerBox + 30});
    } 

    else if (value === 'medium') {
      path.moveTo(p.x, p.y);
      path.lineTo(p.x, p.y - 1 / 3 * l + lowerBox);
      path.rect(p.x - 25, p.y - 1 / 3 * l - 50 + lowerBox, 50, 50);
      path.moveTo(p.x, p.y - 1 / 3 * l - 50 + lowerBox);
      path.lineTo(p.x, q.y);
      
      d3.select('.containerMount').attr('d', path).style('stroke', '#49fb35');
      d3.select('g').append('text').attr('id', 'space').text(`${space}` + '%').attr('x', p.x - 12.5).attr('y', p.y - 1 / 3 * l - 23 + lowerBox);
  
      this.setState({ lowerBox: lowerBox + 30});
    } 
    
    else {
      path.moveTo(p.x, p.y);
      path.lineTo(p.x, p.y - 2 / 7 * l + lowerBox);
      path.rect(p.x - 50, p.y - 2 / 7 * l - 40 + lowerBox, 100, 40);
      path.moveTo(p.x, p.y - 2 / 7 * l - 40 + lowerBox);
      path.lineTo(p.x, q.y);
      d3.select('.containerMount').attr('d', path).style('stroke', '#49fb35');
      d3.select('g').append('text').attr('id', 'space').text(`${space}` + '%').attr('x', p.x - 8).attr('y', p.y - 2 / 7 * l - 16 + lowerBox);
      
      this.setState({ lowerBox: lowerBox + 30});
    }
};

  render() {
 
    return (
        <form onSubmit={this.handleSubmit}>
        <div className='firstTwoQuestions'>
        <p id='instruction1'>1) Create a mount by clicking from the bottom of the wall and dragging up.</p>
        <p id='instruction2'> 2) Choose the container you want to store your tool/tools: </p>
        </div>
        <div id='instruction2Container'>
        <select onChange={(e) => this.handleChange(e)}>
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
        </select>
        <input type="submit" value="Submit" />
        </div>
        <p id='instruction3'>3) Pick up tool with mouse and drag into the new container.</p>
    </form>
    );
  }
}

