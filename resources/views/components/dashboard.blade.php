    <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
                <div class="card-header">
                    <div class="icon icon-warning">
                        <span class="material-icons">equalizer</span>
                    </div>
                </div>
                <div class="card-content">
                    <p class="category"><strong>Utenti iscritti</strong></p>
                    <h3 class="card-title">{{ count($users) }}</h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <i class="material-icons">info</i> See detailed report
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
                <div class="card-header">
                    <div class="icon icon-rose">
                        <span class="material-icons">photo_library</span>

                    </div>
                </div>
                <div class="card-content">
                    <p class="category"><strong>Album inseriti</strong></p>
                    <h3 class="card-title">{{ count($albums) }}</h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <i class="material-icons">local_offer</i> Product-wise sales
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
                <div class="card-header">
                    <div class="icon icon-success">
                        <span class="material-icons">
                            photo
                        </span>

                    </div>
                </div>
                <div class="card-content">
                    <p class="category"><strong>Immagini totali</strong></p>
                    <h3 class="card-title">{{ count($photos) }}</h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <i class="material-icons">date_range</i> Weekly sales
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats">
                <div class="card-header">
                    <div class="icon icon-info">

                        <span class="material-icons">
                            follow_the_signs
                        </span>
                    </div>
                </div>
                <div class="card-content">
                    <p class="category"><strong>Followers</strong></p>
                    <h3 class="card-title">+245</h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <i class="material-icons">update</i> Just Updated
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row ">
        <div class="col-lg-7 col-md-12">
            <div class="card" style="min-height: 485px">
                <div class="card-header card-header-text">
                    <h4 class="card-title">Elenco utenti (ultimi 10)</h4>
                </div>
                <div class="card-content table-responsive">
                    <table class="table table-hover">
                        <thead class="text-primary">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($users->take(10) as $user)
                                <tr>
                                    <td>{{ $user->id }}</td>
                                    <td>{{ $user->name }}</td>
                                    <td>{{ $user->email }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="col-lg-5 col-md-12">
            <div class="card" style="min-height: 485px">
                <div class="card-header card-header-text">
                    <h4 class="card-title">Activities</h4>
                </div>
                <div class="card-content">
                    <div class="streamline">
                        <div class="sl-item sl-primary">
                            <div class="sl-content">
                                <small class="text-muted">5 mins ago</small>
                                <p>Williams has just joined Project X</p>
                            </div>
                        </div>
                        <div class="sl-item sl-danger">
                            <div class="sl-content">
                                <small class="text-muted">25 mins ago</small>
                                <p>Jane has sent a request for access to the project folder</p>
                            </div>
                        </div>
                        <div class="sl-item sl-success">
                            <div class="sl-content">
                                <small class="text-muted">40 mins ago</small>
                                <p>Kate added you to her team</p>
                            </div>
                        </div>
                        <div class="sl-item">
                            <div class="sl-content">
                                <small class="text-muted">45 minutes ago</small>
                                <p>John has finished his task</p>
                            </div>
                        </div>
                        <div class="sl-item sl-warning">
                            <div class="sl-content">
                                <small class="text-muted">55 mins ago</small>
                                <p>Jim shared a folder with you</p>
                            </div>
                        </div>
                        <div class="sl-item">
                            <div class="sl-content">
                                <small class="text-muted">60 minutes ago</small>
                                <p>John has finished his task</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
