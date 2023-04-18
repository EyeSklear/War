let _width = $(window).width();
let _height = $(window).height();
let width = 0.9 * _width;
let height = 0.9 * _height;

let data = null;
let data_file = './data/data.json';
let dragging = false  // 防止拖拽时显示异常

function draw_graph() {
    let svg = d3.select('#container')
        .select('svg')
        .attr('width', width)
        .attr('height', height);

    // 定义颜色比例尺
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    let links = data.links;
    let nodes = data.nodes;

    // 调用d3的force-directed graph实现
    let simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(d => d.dis).strength(0.1))
        .force("charge", d3.forceManyBody().strength(10))
        .force('collide',d3.forceCollide().radius(20).iterations(2))  // 节点之间的斥力，防止重叠
        .force("center", d3.forceCenter(width / 2, height / 2));

    // 实现拖拽后重新进行图布局
    function drag(simulation) {
        function dragstarted(event) {
            dragging = true
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
            dragging = false
        }

        return d3.drag()
            .on("start", dragstarted)  // on表示监听事件，第一个参数为事件名称，第二个参数为对应执行的函数
            .on("drag", dragged)
            .on("end", dragended);
    }


    // links
    let link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.9)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", d => color(d.relation))
        .attr("stroke-opacity", 0.9)
        .attr("stroke-width", d => d.value);
        
    // nodes
    let node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.8)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 20)
        .attr("fill", d => color(d.group))
        .attr("fill-opacity", 1)
        .call(drag(simulation))  // 节点绑定拖拽事件
        .on("mouseover", function (e, d) {  // 鼠标移动到node上
            if (!dragging) {
                let array = new Array
                link
                    .attr('stroke-opacity',f => {
                        if (f.source.id == d.id) {
                            array.push(f.target.id)
                        } else if (f.target.id == d.id) {
                            array.push(f.source.id)
                        } else return 0
                        return 1
                    })
                    .attr("stroke-width", f => f.source.id == d.id || f.target.id == d.id ? f.value*2 : f.value )
                text
                    .attr("display", f => f.id == d.id ? "null" : "none");
                linkLabel
                    .attr("display", f => f.source.id == d.id || f.target.id == d.id ? "null" : "none");
                nodeLabel
                    .attr("display", f => f.id == d.id || array.indexOf(f.id) != -1 ? "null" : "none");
                node
                    .attr("fill", f => f.id == d.id ? "red" : color(f.group))
                    .attr("fill-opacity", f => f.id == d.id || array.indexOf(f.id) != -1 ? 1 : 0)
                    .attr("stroke-opacity", f => f.id == d.id || array.indexOf(f.id) != -1 ? 1 : 0)
            }
            
        })
        .on("mouseout", function (e, d) {  // 鼠标移出node
            if (!dragging) {
                link
                    .attr('stroke-opacity',0.6)
                    .attr("stroke-width", d => d.value)
                text
                    .attr("display", 'none')
                linkLabel
                    .attr("display", "none")
                nodeLabel
                    .attr("display", "null")
                node
                    .attr("fill", d => color(d.group))
                    .attr("fill-opacity", 1)
            }
        })

    // information
    let text = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .text(d => d.info)
        .attr("display", "none")
        .attr('font-size', 12)
        .attr('fill','yellow')

    // nodeLabels
    let nodeLabel = svg.append("g")
        .selectAll('text.label')
        .data(nodes)
        .join('text')    
        .attr('class', 'label')    
        .text(d => d.id)    
        .attr('text-anchor', 'middle') 
        .attr('font-size', 12)
        .attr('fill','white')
        .style('user-select', 'none')    
        .style('pointer-events', 'none')

    // linkLabels
    let linkLabel = svg.append("g")
        .selectAll('text.label')    
        .data(links)
        .join('text')    
        .text(d => d.relation)    
        .attr('font-size', 12) 
        .attr('fill','white')
        .attr("display", "none")
        .attr('text-anchor', 'middle')    
        .style('user-select', 'none')    
        .style('pointer-events', 'none')
        .attr('text-anchor', 'middle')    

    // title
    // node.append("title")
    //     .text(d => d.info);

    // 绘制links和nodes
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        nodeLabel
            .attr('x', d => d.x)
            .attr('y', d => d.y);

        linkLabel
            .attr('x', d => (d.source.x+d.target.x)/2)
            .attr('y', d => (d.source.y+d.target.y)/2);

        text
            .attr('x', d => d.x+15)
            .attr('y', d => d.y);
    });
}

function main() {
    d3.json(data_file).then(function (DATA) {
        data = DATA;
        draw_graph();
    })
}

main()