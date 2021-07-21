import React, { PureComponent, Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { TitledHeader } from 'kqd-page-header';
import Button from 'antd/lib/button';
import getConfigUtils from '../utils/getConfig';
import GMAppGeneralForm from './GMAppGeneralForm';


export default class GMAppForm extends PureComponent {
  render() {
    let { getConfig, API, namespace, modelStatus, REDIRECT,
      formProps = {},
      config,
    } = this.props;

    if (!namespace) {
      namespace = modelStatus.API.substring(modelStatus.API.lastIndexOf('/')).slice(1);
    }

    if (!getConfig || config) {
      if (config) {
        getConfig = getConfigUtils(config);
      } else {
        console.error('请于 props 中给 GMAppForm 传入 config 或 经过 getConfigUtils 包装后的 getConfig');
        return false;
      }
    }

    const { title = true } = formProps;
    let props = {
      ...this.props,
      ...formProps,
      getConfig,
      API,
      columnNum: getConfig('form.colNumber'),
      fields: getConfig('form.fields', this.props.dataPool),
      REDIRECT: REDIRECT === undefined ? `/${namespace}` : REDIRECT,
    };
    const extra = formProps.extra === undefined ? (
      <Button onClick={() => {
        this.props.dataPool.clearForm();
        this.props.router.goBack()
      }}>返回</Button>
    ) : formProps.extra;

    return (
      <Fragment>
        {title ?
          <TitledHeader title={typeof (title) === 'string' ? title : <FormattedMessage id={`${namespace}.form.title`} />}
            extra={ extra }
          >
            <GMAppGeneralForm
              {...props}
            />
          </TitledHeader>
          : <GMAppGeneralForm
            {...props}
          />
        }
      </Fragment>
    );
  }
}

