import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import ReactDOM from 'react-dom';

import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { NodeService } from '../service/NodeService';

const TreeTableDemo = () => {
    const [nodes, setNodes] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState({});
    const nodeservice = new NodeService();

    const toggleApplications = () => {
        let _expandedKeys = { ...expandedKeys };
        if (_expandedKeys['0'])
            delete _expandedKeys['0'];
        else
            _expandedKeys['0'] = true;

        setExpandedKeys(_expandedKeys);
    }

    useEffect(() => {
        nodeservice.getTreeTableNodes().then(data => setNodes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="card">
                <h5>Basic</h5>
                <TreeTable value={nodes}>
                    <Column field="name" header="Name" expander></Column>
                    <Column field="size" header="Size"></Column>
                    <Column field="type" header="Type"></Column>
                </TreeTable>
            </div>

            <div className="card">
                <h5>Programmatic</h5>
                <Button onClick={toggleApplications} label="Toggle Applications" />
                <TreeTable value={nodes} expandedKeys={expandedKeys}
                    onToggle={e => setExpandedKeys(e.value)} style={{ marginTop: '.5em' }}>
                    <Column field="name" header="Name" expander></Column>
                    <Column field="size" header="Size"></Column>
                    <Column field="type" header="Type"></Column>
                </TreeTable>
            </div>
        </div>
    );
}
                
const rootElement = document.getElementById("root");
ReactDOM.render(<TreeTableDemo />, rootElement);