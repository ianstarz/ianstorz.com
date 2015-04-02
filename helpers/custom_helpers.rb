module CustomHelpers
  def canonical_link_tag
    path = current_page.destination_path

    if path == 'index.html'
      path = ''
    else
      path.gsub! '/index.html', ''
      path = '/' + path + '/'
    end

    %Q(<link rel="canonical" href="#{preferred_origin + path}" />)
  end

  def host_with_port
    [host, optional_port].compact.join(':')
  end

  def optional_port
    port unless port.to_i == 80
  end

  def image_url(source)
    protocol + host_with_port + image_path(source)
  end
end
