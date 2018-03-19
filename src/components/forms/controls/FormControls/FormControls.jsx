import React from 'react';
import { observer } from 'mobx-react';

// Components
import Button from '../../Button';
import SimpleButton from '../../SimpleButton';
import CloudinaryUploadButton from "../../CloudinaryUploadButton";

// Styles
import './FormControls.css';

const ctrl = 'f6 link dim br2 ba bw1 ph3 pv2 mv2 mr1 dib b--light-gray bg-white light-red';
const fctrl = 'f5 link dim bn dib mid-gray bg-transparent light-red';

export default observer(({ form, cloudinary = null, submitText = 'Submit', controls = null }) => (
  <div className="tc tl-ns mt2">

    {cloudinary &&
      <CloudinaryUploadButton
        className={`pointer fc-button ` + ctrl}
        imageUploadedCallback={cloudinary.imageUploadedCallback}
        tags={cloudinary.tags}
        preset={cloudinary.preset}
      />
    }

    {(!controls || controls.onSubmit) &&
      <Button
        type="submit"
        className={`pointer fc-button ` + ctrl}
        onClick={form.onSubmit}
        content={(form.submitting || form.validating)
          ? <b><i className="fa fa-spinner fa-spin" /></b>
          : <b><i className="fa fa-dot-circle-o" /> {submitText}</b>}
      />}

    {(!controls || controls.onClear) &&
      <Button
        text={'Clear'}
        icon="eraser"
        className={`pointer fc-button ` + ctrl}
        onClick={form.onClear}
      />}

    {(!controls || controls.onReset) &&
      <Button
        text={'Reset'}
        icon="refresh"
        className={`pointer fc-button ` + ctrl}
        onClick={form.onReset}
      />}

    {controls.onDone &&
      <Button
        text={'Done'}
        // icon=""
        className={`pointer fc-button ` + ctrl}
        onClick={form.onDone}
      />}

    {controls.onResetSelection &&
      <SimpleButton
        text={'Clear selection'}
        className="pointer link underline-hover f6 fw2 br2 ba b--white ph3 pv2 mv2 mr1 dib bg-white gray"
        onClick={form.onResetSelection}
      />}

    {controls.removeCount > 0 &&
      <SimpleButton
        className="f6 fw2 br2 ba b--dotted ph3 pv2 mv2 mr1 dib b--gray bg-white gray"
        text={controls.removeCount + ` image(s) removed`}
      />
    }
    {controls.addCount > 0 &&
      <SimpleButton
        className="f6 fw2 br2 ba b--dotted ph3 pv2 mv2 mr1 dib b--gray bg-white gray"
        text={controls.addCount + ` image(s) added`}
      />
    }
    {controls.saveWarning &&
      <SimpleButton
        className={`f6 fw2 br2 ba b--dotted ph3 pv2 mv2 mr1 dib bg-lighten-75 ` + controls.saveWarningClassName}
        text={'Save to Confirm'}
      />
    }

    <div className="f6 db red">
      {form.error}
    </div>

  </div>
));
