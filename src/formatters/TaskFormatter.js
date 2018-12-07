const TaskFormatter = (json) => {

  const formatIncluded = (ary=[]) => (
    ary.filter(inc => inc.type === 'tags')
    .reduce((memo, inc) => ( {...memo, [inc.id]: inc.attributes.title }), {})
  )

  const formatData = (data, included) => (
    {
      id: data.id,
      title: data.attributes.title,
      status: 'active',
      tags: data.relationships.tags.data
        .reduce((memo2, rel) => ([...memo2, {id: rel.id, title: included[rel.id]}]), [])
    }
  )

  return formatData(json.data, formatIncluded(json.included));
};

export default TaskFormatter;
