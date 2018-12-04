const TagListFormatter = (json) => {

  const formatIncluded = (ary=[]) => (
    ary.filter(inc => inc.type === 'tasks')
    .reduce((memo, inc) => ( {...memo, [inc.id]: inc.attributes.title }), {})
  )

  const formatData = (ary=[], included) => (
    ary.reduce((memo, dta) => ([ ...memo, {
      id: dta.id,
      title: dta.attributes.title,
      count: dta.relationships.tasks.data.length || 0,
      tasks: dta.relationships.tasks.data
        .reduce((memo2, rel) => ([...memo2, {id: rel.id, title: included[rel.id]}]), [])
    }]), [])
  )

  return formatData(json.data, formatIncluded(json.included));
};

export default TagListFormatter;
