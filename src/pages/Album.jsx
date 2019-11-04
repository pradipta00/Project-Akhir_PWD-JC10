import React from 'react'
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

class EditableCell extends React.Component {
  render(){
    const {
        children,
        editing,
        record,
        ...restProps
    } = this.props;
    console.log({
        restProps

    }, 'data')
    return (
      <td {...restProps}>
        {editing ? (
            <Input value={record[restProps.dataIndex]} />
        ) : (
          children
        )}
      </td>
    );
  };

}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        editable: true,
      },
      {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_ , record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
                  <a
                    onClick={() => this.save(record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              Edit
            </a>
          );
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    console.log({form , key})
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => {
            let send = {
                record,
                dataIndex: col.dataIndex,
                editing: this.isEditing(record),
            }
        return send },
      };
    });

    return (
      <>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </>
    );
  }
}

export default EditableTable;