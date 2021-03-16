type MenuData = {
  id: string;
  title: string;
};

type MenuList = {
  id: string;
  title: string;
  child: MenuData[]
};

const menuList: MenuList[] = [
  {
    id: '0',
    title: 'Create',
    child: [
      {id: '0_0', title: 'Infographics'},
      {id: '0_1', title: 'Facebook posts'},
      {id: '0_2', title: 'Reports'},
      {id: '0_3', title: 'Slides'},
      {id: '0_4', title: 'Dashboards'},
      {id: '0_5', title: 'Posters'},
      {id: '0_6', title: 'Social media posts'},
      {id: '0_7', title: 'Email headers'},
      {id: '0_8', title: 'YouTube thumbnails'},
      {id: '0_9', title: 'Single map'},
      {id: '0_10', title: 'Dashboards'},
      {id: '0_11', title: 'Single chart'},
    ]
  },
  {
    id: '1',
    title: 'Examples',
    child: []
  },
  {
    id: '2',
    title: 'Solutions',
    child: [
      {id: '2_0', title: 'Marketing'},
      {id: '2_1', title: 'Media'},
      {id: '2_2', title: 'Education'},
      {id: '2_3', title: 'Nonprofit'},
      {id: '2_4', title: 'Government'},
      {id: '2_5', title: 'Reporting'},
      {id: '2_6', title: 'Teams'}
    ]
  },
  {
    id: '3',
    title: 'Pricing',
    child: []
  },
  {
    id: '4',
    title: 'Customers',
    child: []
  },
  {
    id: '5',
    title: 'Blog',
    child: []
  },

]


//获取路径参数
function getUrlParam(url: string, key: string) {
  //获取参数
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)'); // 匹配目标参数
  var result = url.split('?')[1].match(reg); // 返回参数值
  var keywords = result ? decodeURIComponent(result[2]) : '';
  return keywords;
}

const getMenuListt = (req: { url: string }, res: any) => {
  let keywords = getUrlParam(req.url, 'keywords');
  let filterList =
    !keywords || keywords === ''
      ? menuList
      : menuList.filter((item: { id: string; title: string; child: MenuData[] }) => {
        return (
          item.id.indexOf(keywords) !== -1 ||
          item.title.indexOf(keywords) !== -1
        );
      });
  res.send({
    success: true,
    datas: filterList,
    keywords: keywords,
  });
};


export default {
  '/api/menuList': getMenuListt,
};
