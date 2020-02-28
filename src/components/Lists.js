import React, { Component } from "react";
import ReactDOM from "react-dom";
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
    success: state.auth.success,
    MESSAGE: state.dash.message,
    fetching: state.auth.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLists: () => {
      dispatch(getLists());
    },
    onAddList: (lists, type) => {
      dispatch(addList(lists, type));
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
      showAddCardModal: false,
      showDeleteCardModal: false,
      showCardDetailsModal: false,
      list: {
        name: "",
        position: "",
        cards: []
      },
      card: {
        _id: 0,
        description: "",
        title: ""
      },
      selectedList: null,
      selectedCard: null,
      errorMessages: {
        name: {
          valid: null,
          message: ""
        }
      },
      isValid: false,
      showMenu: false
    };
    this._handleKeyDown.bind(this);
    this.handleDocumentClick.bind(this);
    this._handleKeyDownOnAddCard.bind(this);
  }

  componentDidMount() {
    this.props.onGetLists();
    window.root.addEventListener("click", this.handleDocumentClick);
  }

  handleDocumentClick = evt => {
    const area = ReactDOM.findDOMNode(this.refs.area);

    if (area && !area.contains(evt.target)) {
      this.setState({ showAddListModal: false });
    }
  };

  componentWillReceiveProps(newProps) {
    const { success } = newProps;
    let { list, card } = this.state;

    if (success) {
      list = {
        name: "",
        position: ""
      };
      card = {
        _id: 0,
        title: "",
        description: ""
      };
      this.setState({
        list,
        card,
        showAddListModal: false,
        showDeleteModal: false,
        showAddCardModal: false,
        showDeleteCardModal: false
      });
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

  onUpdateCardField = (key, value) => {
    let { card } = this.state;
    card[key] = value;
    this.setState({ card });
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
      default:
        return;
    }

    if (errorMessages.name.valid) isValid = true;
    else isValid = false;

    this.setState({ errorMessages, isValid });
  };

  /**
   * @description
   * Add new list
   */
  addList = () => {
    let { list, isValid } = this.state;
    let { lists } = this.props;

    if (isValid) {
      list = { ...list, _id: lists.length, cards: [] };

      lists = [...lists, list];

      this.props.onAddList(lists, "List added successfully");
    }
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

  _handleKeyDown = e => {
    if (e.key === "Enter") {
      this.addList();
    }
  };

  _handleKeyDownOnAddCard = e => {
    const { selectedList } = this.state;
    if (e.key === "Enter") {
      this.addCard(selectedList);
    }
  };

  closeForm = () => {
    this.setState({ showAddListModal: false, showMenu: false });
  };

  componentWillUnmount() {
    window.root.removeEventListener("click", this.handleDocumentClick);
  }

  addCard = list => {
    let { card } = this.state;
    let { lists } = this.props;
    if (card.title) {
      card = { ...card, _id: list.cards.length };
      list.cards.push(card);
      this.props.onAddList(lists, "Card added successfully");
    }
  };

  deleteCard = () => {
    const { selectedCard, selectedList } = this.state;
    let { lists } = this.props;
    selectedList.cards.filter(card => card._id === selectedCard._id);
    lists.filter(list => {
      if (list._id === selectedList._id) return selectedList;
      return list;
    });
    this.props.onAddList(lists, "Card removed successfully");
  };

  render() {
    const {
      showAddListModal,
      showDeleteModal,
      showCardDetailsModal,
      list,
      selectedList,
      selectedCard,
      showAddCardModal,
      showDeleteCardModal,
      card
    } = this.state;
    const { lists } = this.props;
    return (
      <div>
        {/* <button
          className="addListBtn"
          onClick={() => this.setState({ showAddListModal: true })}
        >
          <i className="fa fa-plus fa-plus-icon-btn"></i>
          <span className="btn-add-title">Ajouter une liste</span>
        </button> */}

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
                  {/* #card title */}
                  {list.cards.map(card => (
                    <div
                      className="list-card-details js-card-details"
                      onClick={() =>
                        this.setState({
                          showCardDetailsModal: true,
                          selectedList: list,
                          selectedCard: card
                        })
                      }
                    >
                      <div className="list-card-labels js-card-labels">
                        <span
                          className="card-label card-label-red mod-card-front"
                          title="BUG"
                        >
                          <span className="label-text">BUG</span>
                        </span>
                      </div>
                      <span className="list-card-title js-card-name">
                        <span className="card-short-id hide">{card.title}</span>
                      </span>
                      <div className="badges">
                        <span className="js-badges">
                          <div
                            className="badge is-icon-only"
                            title="Vous suivez cette carte."
                          >
                            <span className="badge-icon icon-sm icon-subscribe"></span>
                          </div>
                        </span>
                        <span className="custom-field-front-badges js-custom-field-badges">
                          <span></span>
                        </span>
                        <span className="js-plugin-badges">
                          <span></span>
                        </span>
                      </div>
                      <div className="list-card-members js-list-card-members">
                        <div
                          className="member js-member-on-card-menu"
                          data-idmem="562df4a436f8718f35b9799b"
                        >
                          <span
                            className="member-gold-badge"
                            title="Ce membre a Trello Gold."
                            aria-label="Ce membre a Trello Gold."
                          ></span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* #card titile end */}

                  <a className="list-header-extras-menu dark-hover js-open-list-menu icon-sm icon-overflow-menu-horizontal">
                    <i
                      className="fa fa-ellipsis-h fa-plus-icon-btn"
                      onClick={() => this.selectList(list)}
                    ></i>
                    <div></div>
                  </a>

                  {/* add carte  */}
                  <div className="list-card-details u-clearfix">
                    <div className="list-card-labels u-clearfix js-list-card-composer-labels"></div>
                    {showAddCardModal && (
                      <div>
                        <textarea
                          className="list-card-composer-textarea js-card-title"
                          placeholder="Saisissez un titre pour cette carte…"
                          onChange={e =>
                            this.onUpdateCardField("title", e.target.value)
                          }
                          onKeyDown={this._handleKeyDownOnAddCard}
                          value={card.title}
                          style={{
                            overflow: "hidden",
                            overflowWrap: "break-word",
                            height: "60px",
                            padding: "10px"
                          }}
                          autoFocus
                        ></textarea>
                        <div className="list-card-members js-list-card-composer-members"></div>

                        <div className="list-add-controls u-clearfix">
                          <input
                            className="primary mod-list-add-button js-save-edit"
                            type="submit"
                            value="Ajouter la carte"
                            onClick={() => this.addCard(list)}
                          />
                          <i
                            className="fas fa-times icon-lg dark-hover js-cancel-edit"
                            onClick={() =>
                              this.setState({ showAddCardModal: false })
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* end */}
                </div>
              </div>
              <div className="card-composer-container js-card-composer-container">
                {!showAddCardModal && (
                  <a className="open-card-composer js-open-card-composer">
                    <i className="fa fa-plus icon-add"></i>

                    <span
                      className="js-add-a-card hide"
                      onClick={() =>
                        this.setState({
                          showAddCardModal: true,
                          selectedList: list
                        })
                      }
                    >
                      Ajouter une carte
                    </span>
                  </a>
                )}
                <div className="js-card-templates-button card-templates-button-container dark-background-hover">
                  <div className="js-react-root">
                    <div>
                      <a role="button">
                        <span className="icon-sm icon-template-card dark-background-hover"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div
          className="js-add-list list-wrapper mod-add is-idle"
          onClick={() => this.setState({ showAddListModal: true })}
        >
          <form>
            {!showAddListModal && (
              <a className="open-add-list js-open-add-list">
                <span className="placeholder">
                  <span className="icon-sm icon-add"></span>
                  {lists.length
                    ? "Ajoutez une autre liste"
                    : "Ajoutez une liste"}
                </span>
              </a>
            )}
            {showAddListModal && (
              <div className="add-form" ref="area">
                <input
                  className="list-name-input"
                  type="text"
                  name="name"
                  placeholder="Saisissez le titre de la liste…"
                  value={list.name}
                  onChange={e => this.onUpdateField("name", e.target.value)}
                  onKeyDown={this._handleKeyDown}
                  autoFocus
                />
                <div className="list-add-controls u-clearfix">
                  <input
                    className="primary mod-list-add-button js-save-edit"
                    type="submit"
                    value="Ajouter une liste"
                    onClick={() => this.addList()}
                  />
                  {/* <a
                    className="fas fa-times icon-lg dark-hover js-cancel-edit"
                    onClick={() => this.setState({ showAddListModal: false })}
                  ></a> */}
                  <i
                    className="fas fa-times icon-lg dark-hover js-cancel-edit"
                    onClick={() => this.closeForm()}
                  />
                </div>
              </div>
            )}
          </form>
        </div>

        {/* add Modal */}
        <Modal
          isOpen={showCardDetailsModal}
          style={customStyles}
          onRequestClose={() => this.setState({ showCardDetailsModal: false })}
          shouldCloseOnOverlayClick={true}
        >
          <div ref={ref => (this.modalRef = ref)} id="confirmModal">
            <div className="modal-dialog add-list" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Fellewed card
                  </h5>
                  <br />
                  {/* title  */}
                  <div className="window-header-inline-content quiet js-current-list card-title">
                    <p className="u-inline-block u-bottom">
                      Dans la liste{" "}
                      <a href="#" className="js-open-move-from-header">
                        {selectedList ? selectedList.name : ""}
                      </a>
                    </p>
                  </div>
                  {/* end title */}

                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      this.setState({ showCardDetailsModal: false })
                    }
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="modal-body">
                    <div className="form-row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="inputEmail4">Description</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      this.setState({ showCardDetailsModal: false })
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.followList()}
                  >
                    follow
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      this.setState({
                        showCardDetailsModal: false,
                        showDeleteCardModal: true
                      })
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/** end modal */}

        {/* Delete List Modal */}
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

        {/* Delete Card Modal */}
        <Modal
          isOpen={showDeleteCardModal}
          style={customStyles}
          onRequestClose={() => this.setState({ showDeleteCardModal: false })}
          shouldCloseOnOverlayClick={true}
        >
          <div ref={ref => (this.modalRef = ref)} id="confirmModal">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Delete Card
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      this.setState({ showDeleteCardModal: false })
                    }
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    Do you want to delete{" "}
                    {selectedCard !== null ? selectedCard.title : ""} ?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      this.setState({ showDeleteCardModal: false })
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.deleteCard()}
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

const styles = StyleSheet.create({
  adListBgC: {
    backgroundColor: "red"
  },
  adListBgCA: {
    backgroundColor: "#fff"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
