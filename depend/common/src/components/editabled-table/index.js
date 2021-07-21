import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

import Table from 'antd/lib/table';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Popconfirm from 'antd/lib/popconfirm';
import Form from 'antd/lib/form';
import Divider from 'antd/lib/divider';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber size="small" />;
        }
        return <Input size="small" />;
    };
    render() {
        const {
            editing,
            dataIndex,
            title,
            record,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [
                                            {
                                                required: true,
                                                message: `Please Input ${title}!`,
                                            },
                                        ],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : (
                                restProps.children
                            )}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class EditabledTable extends Component {
    constructor(props) {
        super(props);
        this.handleRowSelectChange = this.handleRowSelectChange.bind(this);
        this.state = {
            data: [],
            columns: [],
            editingKey: '',
            selectedRowKeys: [],
            operate: {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div className="editable-row-operations">
                            {editable ? (
                                <span>
              <EditableContext.Consumer>
                {form => (
                    <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.id)}
                    >
                        Save
                    </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                  title="Sure to cancel?"
                  onConfirm={() => this.cancel(record.id)}
              >
                <a>Cancel</a>
              </Popconfirm>
            </span>
                            ) : (
                                <span>
                                <a onClick={() => this.edit(record.id)}>Edit</a>
                                <Divider type="vertical" />
                                <Popconfirm
                                    title="Sure to delete"
                                    onConfirm={() => this.delete(record.id)}
                                >
                                    <a>Delete</a>
                                </Popconfirm>
                            </span>
                            )}
                        </div>
                    );
                },
            }
        };
    }

    componentDidMount() {
        const { data, columns } = this.props;
        this.setState({
            data,
            columns
        })
    }

    componentWillReceiveProps(nextProps) {
        // clean state
        if (nextProps.selectedRows && nextProps.selectedRows.length === 0) {
            this.setState({
                selectedRowKeys: [],
            });
        }
    }

    handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.onSelectRow(selectedRowKeys);
        this.setState({
            selectedRowKeys,
        })
    }

    isEditing = (record) => {
        return record.id === this.state.editingKey;
    };
    edit(id) {
        this.setState({ editingKey: id });
    }
    save(from, key) {
        from.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                const rowValue = {
                    ...item,
                    ...row,
                }
                this.props.onEditRow(rowValue)
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(this.props.data);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }
    cancel = () => {
        this.setState({ editingKey: '' });
    };
    delete = (id) => {
        this.props.onDeleteRow(id)
    }

    render() {
        const { selectedRowKeys } = this.state;
        const { pagination, loading, rowSelection = true, data } = this.props;
        const paginationProps = pagination && typeof pagination === 'object' ? {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        } : false;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.state.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        columns.push(this.state.operate)

        const rowSelectionProps = rowSelection ? {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: record.disabled,
            }),
        } : null;

        return (
            <div className="kc-std-table">
                <Table
                    components={components}
                    bordered
                    // dataSource={this.state.data.length > 0 ? this.state.data : data}
                    dataSource={this.state.data.length > 0 ? this.state.data : data}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={paginationProps}
                    loading={loading}
                    rowSelection={rowSelectionProps}
                />
            </div>
        );
    }
}

EditabledTable.propTypes = {
    onEditRow: PropTypes.func,
    data: PropTypes.array,
    pagination: PropTypes.object,
    columns: PropTypes.array,
    loading: PropTypes.bool,
}

export default EditabledTable;
