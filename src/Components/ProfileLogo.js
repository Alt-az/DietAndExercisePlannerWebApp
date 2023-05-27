
export default function ProfileLogo() {
    return (
    <div class="dropdown">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
          My profile
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">My diet plan</a></li>
          <li><a class="dropdown-item" href="#">My training plan</a></li>
          <li><a class="dropdown-item" href="#">My statistics</a></li>
        </ul>
    </div>
    );
  }
  