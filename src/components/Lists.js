import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { StyleSheet, css } from "aphrodite";
import { getLists, addList, deleteList } from "../actions/dash";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    lists: state.dash.lists,
    success: state.auth.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLists: () => {
      dispatch(getLists());
    },
    onAddList: lists => {
      dispatch(addList(lists));
    },
    ondeleteList: lists => {
      dispatch(deleteList(lists));
    }
  };
};

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddListModal: false,
      showDeleteModal: false,
      list: {
        name: "",
        position: ""
      },
      selectedList: null,
      errorMessages: {
        name: {
          valid: null,
          message: ""
        },
        position: {
          valid: null,
          message: ""
        }
      },
      isValid: false
    };
  }

  componentDidMount() {
    this.props.onGetLists();
  }

  componentWillReceiveProps(newProps) {
    const { success } = newProps;
    let { list } = this.state;

    if (success) {
      list = {
        name: "",
        position: ""
      };
      this.setState({ list, showAddListModal: false, showDeleteModal: false });
    }
  }

  /**
   * @description
   * update state
   */
  onUpdateField = (key, value) => {
    let { list } = this.state;
    list[key] = value;
    this.setState({ list }, () => this.validateFields(key));
  };

  /**
   * @description
   * Validate add list form
   */
  validateFields = key => {
    let { errorMessages, isValid } = this.state;
    const { list } = this.state;

    switch (key) {
      case "name": {
        if (!list.name) {
          errorMessages.name.valid = false;
          errorMessages.name.message = "List name is required !";
        } else {
          errorMessages.name.valid = true;
          errorMessages.name.message = "";
        }
        break;
      }
      case "position": {
        const isValid = /^\d+(\.\d{1,2})?$/.test(list.position);
        if (!list.position) {
          errorMessages.position.valid = false;
          errorMessages.position.message = "List position is required !";
        } else if (!isValid) {
          errorMessages.position.valid = false;
          errorMessages.position.message = "position value is not valid !";
        } else {
          errorMessages.position.valid = true;
          errorMessages.position.message = "";
        }
        break;
      }
      default:
        return;
    }

    if (errorMessages.name.valid && errorMessages.position.valid)
      isValid = true;
    else isValid = false;

    this.setState({ errorMessages, isValid });
  };

  /**
   * @description
   * Add new list
   */
  addList = () => {
    let { list } = this.state;
    let { lists } = this.props;

    list = { ...list, _id: lists.length + 1 };

    lists = [...lists, list];

    this.props.onAddList(lists);
  };

  /**
   * @description
   * Set selected list
   */
  selectList = item => {
    this.setState({ selectedList: item, showDeleteModal: true });
  };

  /**
   * @description
   * Delete selected list
   */
  deleteList = () => {
    let { lists } = this.props;
    const { selectedList } = this.state;

    lists = lists.filter(list => list._id !== selectedList._id);

    this.props.ondeleteList(lists);
  };

  render() {
    const {
      showAddListModal,
      showDeleteModal,
      isValid,
      errorMessages,
      list,
      selectedList
    } = this.state;
    const { lists } = this.props;
    return (
      <div>
        <button
          className="addListBtn"
          onClick={() => this.setState({ showAddListModal: true })}
        >
          <i className="fa fa-plus fa-plus-icon-btn"></i>
          <span className="btn-add-title">Ajouter une liste</span>
        </button>

        {lists.map(list => (
          <div className="js-list list-wrapper" key={list._id}>
            <div className="list js-list-content">
              <div className="list-header js-list-header u-clearfix is-menu-shown">
                <div className="list-header-target js-editing-target"></div>
                <h2
                  className="list-header-name-assist js-list-name-assist"
                  dir="auto"
                >
                  {list.name}
                </h2>
                <textarea
                  className="list-header-name mod-list-name js-list-name-input"
                  aria-label="Backlog"
                  dir="auto"
                  style={{
                    overflow: "hidden",
                    overflowWrap: "break-word",
                    height: "28px"
                  }}
                  defaultValue={list.name}
                ></textarea>
                <div className="list-header-extras">
                  <i
                    className="fa fa-trash icon-delete"
                    onClick={() => this.selectList(list)}
                  ></i>
                </div>
              </div>
              <div className="card-composer-container js-card-composer-container">
                <a
                  className="open-card-composer js-open-card-composer"
                  href="#"
                >
                  <i className="fa fa-plus icon-add"></i>
                  <span className="js-add-a-card hide">Ajouter une carte</span>
                </a>
                <div className="js-card-templates-button card-templates-button-container dark-background-hover">
                  <div className="js-react-root">
                    <div>
                      <a role="button" href="#">
                        <span className="icon-sm icon-template-card dark-background-hover"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* add Modal */}
        <Modal
          isOpen={showAddListModal}
          style={customStyles}
          onRequestClose={() => this.setState({ showAddListModal: false })}
          shouldCloseOnOverlayClick={true}
        >
          <div ref={ref => (this.modalRef = ref)} id="confirmModal">
            <div className="modal-dialog add-list" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add a new list
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => this.setState({ showAddListModal: false })}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="modal-body">
                    <div className="form-row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="inputEmail4">List name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="List name"
                            value={list.name}
                            onChange={e =>
                              this.onUpdateField("name", e.target.value)
                            }
                            required
                            autoFocus
                          />
                          {!errorMessages.name.valid && (
                            <span className="error-message">
                              {errorMessages.name.message}
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputEmail4">List position</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail2"
                            placeholder="Order timer (Minutes)"
                            value={list.position}
                            onChange={e =>
                              this.onUpdateField("position", e.target.value)
                            }
                            required
                          />
                          {!errorMessages.position.valid && (
                            <span className="error-message">
                              {errorMessages.position.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showAddListModal: false })}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.addList()}
                    disabled={!isValid}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/** end modal */}

        {/* Set Modal */}
        <Modal
          isOpen={showDeleteModal}
          style={customStyles}
          onRequestClose={() => this.setState({ showDeleteModal: false })}
          shouldCloseOnOverlayClick={true}
        >
          <div ref={ref => (this.modalRef = ref)} id="confirmModal">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Delete list
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => this.setState({ showDeleteModal: false })}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    Do you want to delete{" "}
                    {selectedList !== null ? selectedList.name : ""} ?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showDeleteModal: false })}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.deleteList()}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/** end modal */}
      </div>
    );
  }
}

const styles = StyleSheet.create({});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
