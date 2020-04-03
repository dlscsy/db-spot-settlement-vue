<!-- 封装菜单项函数式、工具类型的组件，实现提供了icon和title就能生成菜单项 -->
<script>
export default {
  name: "SubjectSiderMenuItem",
  functional: true,
  props: {
    // 图标
    icon: {
      type: String,
      default: ""
    },
    // 标题
    title: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} />);
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  }
};
</script>
