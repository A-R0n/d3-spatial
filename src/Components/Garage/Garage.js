import React, { Component} from 'react';
import * as d3 from 'd3';
import './Garage.css';

export default class Garage extends Component{
    render(){
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
		const width = 580 - margin.left - margin.right;
		const height = 460 - margin.top - margin.bottom;
        var svg = d3.select('body').append('svg').attr('class', 'house').attr('width', width).attr('height', height);
       
        svg.append('rect').attr('class', 'garage').attr('x', 20).attr('y', 20).attr('width', 500).attr('height', 380);

        svg.append('rect').attr('class', 'squareSpace').attr('x', 65).attr('y', 40).attr('width', 420).attr('height', 270);

        var lines = d3.select('.squareSpace').call(draw);
        svg.append('rect').attr('class', 'groundTrim').attr('x', 65).attr('y', 305).attr('width', 420).attr('height', 5);
        svg.append('rect').attr('class', 'door').attr('x', 370).attr('y', 80).attr('width', 100).attr('height', 225);
        

        svg.append('line').attr('class', 'topLeft').attr('x1', 20).attr('y1', 20).attr('x2', 65).attr('y2', 40);
        svg.append('line').attr('class', 'bottomLeft').attr('x1', 20).attr('y1', 400).attr('x2', 65).attr('y2', 310);
        svg.append('line').attr('class', 'bottomRight').attr('x1', 520).attr('y1', 400).attr('x2', 485).attr('y2', 310);
        svg.append('line').attr('class', 'topRight').attr('x1', 520).attr('y1', 20).attr('x2', 485).attr('y2', 40);

        svg.append('line').attr('class', 'doorOpenEdge').attr('x1', 462).attr('y1', 82).attr('x2', 465).attr('y2', 83);
        svg.append('line').attr('class', 'doorOpenEdge').attr('x1', 462).attr('y1', 82).attr('x2', 462).attr('y2', 300);
        svg.append('line').attr('class', 'doorOpenEdge').attr('x1', 465).attr('y1', 83).attr('x2', 465).attr('y2', 293);
        svg.append('line').attr('class', 'doorOpenEdge').attr('x1', 462).attr('y1', 300).attr('x2', 465).attr('y2', 293);

        svg.append('line').attr('id', 'doorFrame').attr('x1', 415).attr('y1', 88).attr('x2', 415).attr('y2', 265);
        svg.append('line').attr('id', 'doorFrame').attr('x1', 415).attr('y1', 88).attr('x2', 462).attr('y2', 82);
        svg.append('line').attr('id', 'doorFrame').attr('x1', 415).attr('y1', 265).attr('x2', 462).attr('y2', 300);
        
        svg.append('circle').attr('class', 'doorHandle').attr('cx', 420).attr('cy', 188).attr('r', 4.5);
        svg.append('circle').attr('class', 'doorHandle').attr('cx', 413).attr('cy', 188).attr('r', 3.15);

        svg.append('line').attr('id', 'backdrop').attr('x1', 370).attr('y1', 200).attr('x2', 415).attr('y2', 200);

        var clipPath = svg.append('image').attr('href', 'https://image.flaticon.com/icons/svg/1519/1519002.svg').attr('id', 'fishTank').attr('x', 370).attr('y', 100);
        
        // d3.select('door').append('rect').attr('class', 'doorOpen');
        function draw(selection){
            var xy0, 
                path, 
                keep = false, 
                line = d3.line()
                         .x(function(d){ return d[0]; })
                         .y(function(d){ return d[1]; });
        
            selection
                .on('mousedown', function(){ 
                    keep = true;
                    xy0 = d3.mouse(this);
                    path = d3.select('svg')
                             .append('path')
                             .attr('class', 'containerBar')
                             .attr('d', line([xy0, xy0]))
                             .style('stroke', 'red')
                             .style('stroke-width', '2px');
                })
                .on('mouseup', function(){ 
                    keep = false; 
                })
                .on('mousemove', function(){ 
                    if (keep) {
                        var Line = line([xy0, d3.mouse(this).map(function(x){ return x - 1; })]);
                        path.attr('d', Line);
                    }
                });
        }
        
       
        return(<div><p>How do I maximize the use of space given the following constraints:</p> </div>)
    }
}