import ShowRichText from '../components/show-richText/ShowRichText';

const TestShowRichText = ({ }) => {

  const showRichTextProps = {
    title: '基本规则',
    content: '<p>这是一个适用于手机端的展示富文本内容的组件，PC端查看请按F12,手机模式</p>'
  }

  return (
    <ShowRichText {...showRichTextProps}/>
  )

}

export default TestShowRichText
