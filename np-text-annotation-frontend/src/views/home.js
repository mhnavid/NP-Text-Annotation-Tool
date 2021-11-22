import React from "react";
import {
  Button,
  Col,
  Container,
  Row,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";
import Dropzone from "react-dropzone";
import { Alert } from "reactstrap";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annotationData: [],
      inputVisibility: true,
      mainFiles: [],
      metroText: "",
      serialText: "",
      numberText: "",
      imageIndex: 0,
    };

    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
    this.handleExportToCSVClick = this.handleExportToCSVClick.bind(this);
  }

  clearInputs() {
    this.setState({
      metroText: "",
      serialText: "",
      numberText: "",
    });
  }

  handleNextButtonClick(event) {
    event.preventDefault();
    if (this.state.imageIndex < this.state.mainFiles.length) {
      let data = {
        image: this.state.mainFiles[this.state.imageIndex].name,
        text:
          this.state.metroText +
          " " +
          this.state.serialText +
          " " +
          this.state.numberText,
      };
      this.setState(
        {
          annotationData: [...this.state.annotationData, data],
          imageIndex: this.state.imageIndex + 1,
        },
        () => this.clearInputs()
      );
    } else {
      alert("No image left!");
    }
  }

  handleExportToCSVClick() {
    axios
      .post("http://localhost:4000/export-csv", {
        annotationData: this.state.annotationData,
      })
      .then((response) => {
        if (response.status === 200) {
          window.open("http://localhost:4000/annotation.csv", "_blank");
          window.location.reload();
        }
      });
  }

  render() {
    console.log(this.state.annotationData);
    return (
      <Container>
        {this.state.inputVisibility ? (
          <div>
            <Row
              className="justify-content-md-center"
              style={{ marginTop: "30px" }}
            >
              <Dropzone
                accept={"image/*"}
                onDrop={(acceptedFiles) => {
                  this.setState(
                    {
                      mainFiles: acceptedFiles,
                    },
                    () => {
                      this.setState({
                        inputVisibility: false,
                      });
                    }
                  );
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input
                        {...getInputProps()}
                        directory=""
                        webkitdirectory=""
                        type="file"
                      />
                      {this.state.mainFiles.length === 0 ? (
                        <p>
                          Drag 'n' drop <b>Directory</b> here, or click to
                          select <b>Directory</b>
                        </p>
                      ) : (
                        <Alert variant="success">
                          <b>{this.state.mainFiles.length}</b> files selected.
                        </Alert>
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>
            </Row>
          </div>
        ) : (
          <div>
            <Row className="text-center" style={{ marginTop: "30px" }}>
              <Col>
                {this.state.imageIndex < this.state.mainFiles.length ? (
                  <img
                    className="img-responsive"
                    src={URL.createObjectURL(
                      this.state.mainFiles[this.state.imageIndex]
                    )}
                    alt="NP_image"
                  />
                ) : (
                  ""
                )}
              </Col>
              <Col>
                <Button
                  color="success"
                  size="lg"
                  onClick={this.handleExportToCSVClick}
                >
                  Export to CSV
                </Button>
              </Col>
            </Row>
            <Form onSubmit={this.handleNextButtonClick}>
              <Row style={{ marginTop: "30px" }}>
                <Col>
                  <FormGroup>
                    <Label for="metro">Metro</Label>
                    <Input
                      id="metro"
                      name="metro"
                      placeholder="Metro"
                      type="text"
                      value={this.state.metroText}
                      onChange={(e) =>
                        this.setState({ metroText: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="serial">Serial</Label>
                    <Input
                      id="serial"
                      name="serial"
                      placeholder="Serial"
                      type="text"
                      value={this.state.serialText}
                      onChange={(e) =>
                        this.setState({ serialText: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="number">Number</Label>
                    <Input
                      id="number"
                      name="number"
                      placeholder="Number"
                      type="text"
                      autoComplete="off"
                      value={this.state.numberText}
                      onChange={(e) =>
                        this.setState({ numberText: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="text-center" style={{ marginTop: "20px" }}>
                <Col>
                  <Button color="primary">Next Image</Button>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </Container>
    );
  }
}

export default Home;
