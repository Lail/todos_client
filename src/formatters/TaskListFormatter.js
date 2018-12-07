const TaskListFormatter = (json) => {

  const formatIncluded = (ary=[]) => (
    ary.filter(inc => inc.type === 'tags')
    .reduce((memo, inc) => ( {...memo, [inc.id]: inc.attributes.title }), {})
  )

  const formatData = (ary=[], included) => (
    ary.reduce((memo, dta) => ([ ...memo, {
      id: dta.id,
      title: dta.attributes.title,
      status: 'active',
      tags: dta.relationships.tags.data
        .reduce((memo2, rel) => ([...memo2, {id: rel.id, title: included[rel.id]}]), [])
    }]), [])
  )

  return formatData(json.data, formatIncluded(json.included));
};

export default TaskListFormatter;
