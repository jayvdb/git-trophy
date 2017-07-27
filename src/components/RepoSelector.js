import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Button, Form, Dropdown, Header } from 'semantic-ui-react'

const DEFAULT_GITHUB_ENTITY = 'sindresorhus'

export default class RepoSelector extends React.Component {
  static propTypes = {
    yearOptions: PropTypes.array.isRequired,
    submitRepoChanges: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDropdownChange = this.handleDropdownChange.bind(this)
    this.handleEntityChange = this.handleEntityChange.bind(this)

    this.state = {
      githubEntity: 'DEFAULT_GITHUB_ENTITY',
      selectedYear: this.props.yearOptions ? this.props.yearOptions[0] : null
    }
  }

  handleSubmit () {
    this.props.submitRepoChanges(this.props.entity, this.props.year)
  }

  handleDropdownChange (e, data) {
    this.props.updateSelectedYear(data.value)
  }

  handleEntityChange (e, data) {
    this.props.updateSelectedEntity(data.value)
  }

  render () {
    return (
      <Segment attached='top'>
        <Header>Generate a Git Trophy</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Form.Input
              onChange={this.handleEntityChange}
              value={this.props.entity}
              label='Github Username or Repo'
              placeholder='User / Repo Name' />
          </Form.Field>
          <Form.Field>
            <label>Year</label>
            <Dropdown
              onChange={this.handleDropdownChange}
              fluid
              selection
              options={this.props.yearOptions}
              disabled={this.props.entity == ''}
              defaultValue='2017' />
          </Form.Field>
          <Button
            type='submit'
            primary
            disabled={!(this.props.entity && this.props.year)}>
              Generate!
          </Button>
        </Form>
      </Segment>
    )
  }
}
