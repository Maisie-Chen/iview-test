export default {
  name: 'RenderDom',
  functional: true,
  props: {
    render: Function
  },
  render: (h, ctx) => ctx.props.render(h)
}
