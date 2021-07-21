/**
    * @author
    * @editor
    * @updated
    * @desc    用于突出其中一项的文本。
    * @eg
    <HighlightText>
			data = []   //文本数据源
			index = ''   // 需要突出显示的文本的下标
			align = ''  //文本的排布方式，可选："row","col"。默认值： "row"
    </HighlightText>
 */



/**
 * 用于突出其中一项的文本。
 * @parameter
 *  data <Array> 文本数据源
 *  index <Number> 需要突出显示的文本的下标
 *  [align] <String> 文本的排布方式，可选："row","col"。默认值： "row"
 */
import React from 'react';
import './index.css';

const HighlightText = (props) => {
	const align = props.align || "row";
    return (
        <div className="contentBox">
			{ props.data.map( (v,i) => {
				const style = props.index === i ? "special" : "normal";
				if( align === 'row') {
					return (
						<div className={style} key={i}>{ v }</div>
					);
				}else{
					return (
						<span className={style} key={i}>{ v }</span>
					);
				}

			})}
		</div>
    );
}
export default HighlightText;
