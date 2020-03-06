import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Container,
  Divider,
  Button,
  Header,
  Icon,
  Input,
  Label
} from "semantic-ui-react";
import TextBlock from "../component/TextBlock";
import HeaderBar from "../component/HeaderBar";
import axios from "../utils/axios";
import SavedModal from "../component/SavedModal";
import SaveErrorModal from "../component/SaveErrorModal";
import { v4 as uuidv4 } from "uuid";
import TopicAndSubtopic from "../component/TopicAndSubtopic";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleTitle: "",
      blocks: {},
      blocksrendered: [],
      id: uuidv4(),
      blockContent: "",
      isSaved: false,
      isSaveError: false
    };
  }

  setArticleTitle = value => {
    this.setState({
      articleTitle: value
    });
  };

  setBlockContent = value => {
    this.setState({
      blockContent: value
    });
  };
  closeSaveModal = () => this.setState({ isSaved: false });
  closeSaveErrorModal = () => this.setState({ isSaveError: false });

  publishArticle = async article => {
    try {
      const articleDetails = {
        title: this.state.articleTitle,
        categories: this.state.categories,
        subCategories: this.state.subCategories,
        blocks: this.state.blocks,
        published: this.state.published
      };
      console.log("hello there");
      const res = await axios.post("/articles", articleDetails);
      console.log(res);
      this.setState({
        isSaved: true
      });
    } catch (err) {
      this.setState({
        isSaveError: true
      });
    }
  };

  insertTextBlock = () => {
    const index = this.state.blocksrendered.length;
    const renderArr = this.state.blocksrendered;
    renderArr.push(
      <TextBlock
        key={index}
        updateInputText={this.updateInputText}
        index={index}
      />
    );
    this.setState({ blocksrendered: renderArr });
  };

  updateInputText = (index, value) => {
    const blockobj = this.state.blocks;
    blockobj[index] = { type: "text", inputText: value };
    this.setState({ blocks: blockobj });
  };

  render = () => {
    return (
      <Container>
        <HeaderBar saveDraft={this.publishArticle} />
        <Container>
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Container textAlign="center">
            <Header as="h1">Editor</Header>
            <Container>
              <TopicAndSubtopic
                id={this.state.id}
                blockContent={this.setBlockContent}
                workingArticleTitle={this.setArticleTitle}
              />
            </Container>
            <Input
              label={
                <Label color="teal" tag>
                  Title
                </Label>
              }
              labelPosition="right"
              size="large"
              placeholder="Enter title here"
              value={this.state.articleTitle}
              onChange={e => this.setState({ articleTitle: e.target.value })}
              aria-label="Article Title Input Box"
            />
            <Divider hidden />
            <Button
              icon
              onClick={this.insertTextBlock}
              aria-label="Add Text Button"
            >
              <Icon name="text cursor" />
            </Button>
            <SavedModal
              isSaved={this.state.isSaved}
              onHandleSave={this.closeSaveModal}
            />
            <SaveErrorModal
              isSaveError={this.state.isSaveError}
              onHandleSaveError={this.closeSaveErrorModal}
            />
          </Container>
          <Divider hidden />
        </Container>
        <Container textAlign="center" aria-label="Main Article Container">
          <div>{this.state.blocksrendered}</div>
          <Divider hidden />
        </Container>
      </Container>
    );
  };
}

export default Editor;
